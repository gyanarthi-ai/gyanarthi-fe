import React from "react";
import { Progress } from "../ui/progress";

interface ChatPopup {
  factual_accuracy?: string;
  ground_truth?: string;
  confidence_score?: number;
}

const ChatPopup = ({
  factual_accuracy,
  ground_truth,
  confidence_score,
}: ChatPopup) => {
  return (
    <div className="border-b p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Review</h3>
      </div>
      <div className="grid gap-3">
        {factual_accuracy && (
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Factual Accuracy</span>
              <span>{factual_accuracy}</span>
            </div>
          </div>
        )}
        {ground_truth && (
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Ground Truth</span>
              <span>{ground_truth}</span>
            </div>
          </div>
        )}
        {confidence_score && (
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Confidence Score</span>
              <span>{confidence_score}</span>
            </div>
            <Progress value={confidence_score} className="h-2 bg-emerald-100" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPopup;
