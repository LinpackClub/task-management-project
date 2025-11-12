import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCard = ({ title, count, change, type }) => {
  const getTypeStyles = () => {
    const styles = {
      todo: { bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
      inProgress: { bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
      completed: { bgColor: 'bg-green-50', textColor: 'text-green-700' },
      review: { bgColor: 'bg-purple-50', textColor: 'text-purple-700' }
    };
    return styles[type] || styles.todo;
  };

  const styles = getTypeStyles();
  const isPositive = change && change.includes('+');

  return (
    <div className={`summary-card ${styles.bgColor}`}>
      <div className="summary-content">
        <h3 className="summary-title">{title}</h3>
        <div className="summary-count">{count}</div>
        {change && (
          <div className={`summary-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;