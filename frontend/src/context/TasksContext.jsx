import React, { createContext, useContext, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useAuth } from "./AuthContext";

const TasksContext = createContext({});

export function TasksProvider({ children }) {
  const { user } = useAuth();
  const [profileCache, setProfileCache] = useState(null);

  const getUserId = () => user?.id ?? null;

  async function fetchMyProfile() {
    if (profileCache) return profileCache;
    const userId = getUserId();
    if (!userId) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("id, role, department, email, full_name")
      .eq("id", userId)
      .single();
    if (!error) setProfileCache(data);
    return data;
  }
  function isAdmin() {
    return profileCache?.role === "admin";
  }
  function isLead() {
    return profileCache?.role === "lead";
  }
  function isMember() {
    return profileCache?.role === "member";
  }
  function isLeadOfDepartment(dept) {
    return isLead() && profileCache?.department === dept;
  }
  function isMemberOfDepartment(dept) {
    return isMember() && profileCache?.department === dept;
  }
  function isCreator(task) {
    return task?.created_by === getUserId();
  }
  function isAssignee(task) {
    return task?.assignee === getUserId();
  }

  async function logActivity(
    actorId,
    action,
    subjectType,
    subjectId,
    details = {}
  ) {
    return supabase.from("activity_logs").insert([
      {
        actor: actorId,
        action,
        subject_type: subjectType,
        subject_id: subjectId,
        details,
      },
    ]);
  }

  // create a task
  async function createTask({
    title,
    description = "",
    department = null,
    team_id = null,
    assignee = null,
    due_date = null,
    priority = "medium",
  }) {
    const userId = getUserId();
    if (!userId) return { data: null, error: new Error("Not authenticated") };

    const profile = await fetchMyProfile();

    if (isAdmin()) {
    } else if (isLead()) {
      if (payload.department && payload.department !== profile.department) {
        return {
          data: null,
          error: new Error("Leads can only create tasks for their department"),
        };
      }
    } else if (isMember()) {
      if (!payload.department || payload.department !== profile.department) {
        return {
          data: null,
          error: new Error("Members can only create tasks in their department"),
        };
      }
    } else {
      return {
        data: null,
        error: new Error("Pending users cannot create tasks"),
      };
    }

    const payload = {
      title,
      description,
      department,
      team_id,
      assignee,
      due_date,
      priority,
      created_by: userId,
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert([payload])
      .select()
      .single();
    if (!error)
      await logActivity(userId, "create_task", "task", data?.id, { title });
    return { data, error };
  }

  // fetch tasks (optionally filter by team/department/status)
  async function fetchTasks({
    teamId = null,
    department = null,
    status = null,
    limit = 100,
    offset = 0,
  } = {}) {
    let q = supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (teamId) q = q.eq("team_id", teamId);
    if (department) q = q.eq("department", department);
    if (status) q = q.eq("status", status);
    const { data, error } = await q;
    return { data, error };
  }

  async function fetchTaskDetail(taskId) {
    const { data: task, error: taskErr } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .single();
    if (taskErr) return { data: null, error: taskErr };

    const [{ data: attachments }, { data: comments }] = await Promise.all([
      supabase.from("attachments").select("*").eq("task_id", taskId),
      supabase
        .from("comments")
        .select("*, profiles:user_id(id, full_name)")
        .eq("task_id", taskId)
        .order("created_at", { ascending: true }),
    ]);

    return { data: { ...task, attachments, comments }, error: null };
  }

  async function updateTask(taskId, changes = {}) {
    const userId = getUserId();
    const profile = await fetchMyProfile();

    const { data: task, error: tErr } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .single();
    if (tErr) return { data: null, error: tErr };

    if (isAdmin()) {
    } else if (isLead()) {
      const isTeamLead = await checkIfUserIsTeamLeadOf(task.team_id); // implement similarly
      if (!(isLeadOfDepartment(task.department) || isTeamLead)) {
        return {
          data: null,
          error: new Error(
            "Leads can only manage tasks in their department/team"
          ),
        };
      }
    } else if (isMember()) {
      if (task.created_by !== userId) {
        return {
          data: null,
          error: new Error("Members can only edit tasks they created"),
        };
      }
      const forbiddenFields = ["department", "team_id", "created_by"];
      for (const k of Object.keys(changes)) {
        if (forbiddenFields.includes(k)) {
          return {
            data: null,
            error: new Error("You are not allowed to change that field"),
          };
        }
      }
    } else {
      return {
        data: null,
        error: new Error("Pending users cannot update tasks"),
      };
    }

    const { data, error } = await supabase
      .from("tasks")
      .update(changes)
      .eq("id", taskId)
      .select()
      .single();
    if (!error)
      await logActivity(userId, "update_task", "task", taskId, { changes });
    return { data, error };
  }

  async function changeStatus(taskId, newStatus) {
    return updateTask(taskId, { status: newStatus });
  }

  async function assignTask(taskId, assigneeUserId) {
    return updateTask(taskId, { assignee: assigneeUserId });
  }

  async function deleteTask(taskId) {
    const userId = getUserId();
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .select()
      .single();
    if (!error) await logActivity(userId, "delete_task", "task", taskId);
    return { data, error };
  }

  async function addComment(taskId, body) {
    const userId = getUserId();
    if (!userId) return { data: null, error: new Error("Not authenticated") };
    const { data, error } = await supabase
      .from("comments")
      .insert([{ task_id: taskId, user_id: userId, body }])
      .select()
      .single();
    if (!error)
      await logActivity(userId, "add_comment", "task", taskId, { body });
    return { data, error };
  }

  async function fetchComments(taskId) {
    const { data, error } = await supabase
      .from("comments")
      .select("*, profiles:user_id(id, full_name)")
      .eq("task_id", taskId)
      .order("created_at", { ascending: true });
    return { data, error };
  }

  async function addAttachment(taskId, fileName, fileUrl) {
    const userId = user?.id;
    if (!userId) return { data: null, error: new Error("Not authenticated") };

    const { data, error } = await supabase
      .from("attachments")
      .insert([
        {
          task_id: taskId,
          file_name: fileName,
          file_url: fileUrl,
          uploaded_by: userId,
        },
      ])
      .select()
      .single();

    if (!error) {
      await logActivity(userId, "add_attachment", "task", taskId, {
        fileName,
        fileUrl,
      });
    }

    return { data, error };
  }

  async function fetchAttachments(taskId) {
    const { data, error } = await supabase
      .from("attachments")
      .select("*")
      .eq("task_id", taskId)
      .order("created_at", { ascending: false });
    return { data, error };
  }
  // helper function to check if user is team lead of a given team
  async function checkIfUserIsTeamLeadOf(teamId) {
    if (!teamId) return false;
    const userId = getUserId();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", teamId)
      .eq("user_id", userId)
      .eq("role", "lead")
      .limit(1);
    return !!(data && data.length);
  }

  function subscribeToTasks(handler) {
    const channel = supabase
      .channel(`public-tasks`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => handler(payload)
      )
      .subscribe();

    return {
      channel,
      unsubscribe: () => supabase.removeChannel(channel),
    };
  }

  const api = {
    createTask,
    fetchTasks,
    fetchTaskDetail,
    updateTask,
    deleteTask,
    changeStatus,
    assignTask,
    addComment,
    fetchComments,
    addAttachment,
    fetchAttachments,
    fetchTasksForTeam: (teamId) => fetchTasks({ teamId }),
    fetchTasksForDepartment: (department) => fetchTasks({ department }),
    checkIfUserIsTeamLeadOf,
    subscribeToTasks,
  };

  return <TasksContext.Provider value={api}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  return useContext(TasksContext);
}
