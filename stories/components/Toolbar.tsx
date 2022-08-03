import React, { SyntheticEvent } from 'react';

export type ToolName = 'move' | 'select';

export type ToolbarProps = {
  selectedTool?: ToolName;
  onToolChange?: (newTool: ToolName) => void;
};

export function Toolbar({ selectedTool = 'move', onToolChange }: ToolbarProps) {
  const onChange = function (e: SyntheticEvent<HTMLInputElement>) {
    onToolChange && onToolChange(e.currentTarget.value as ToolName);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <input
          type="radio"
          id="move"
          name="tool"
          value="move"
          onChange={(e) => {
            onChange(e);
          }}
          checked={selectedTool === 'move'}
        />
        <label htmlFor="move">Move</label>
      </div>
      <div>
        <input
          type="radio"
          id="select"
          name="tool"
          value="select"
          onChange={(e) => {
            onChange(e);
          }}
          checked={selectedTool === 'select'}
        />
        <label htmlFor="select">Select</label>
      </div>
    </div>
  );
}
