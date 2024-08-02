import { Slider } from '@mui/material';

import styles from './ScoreSelector.module.css';

interface ScoreSelectorProps {
  step?: number;
  min?: number;
  max?: number;
  selectedScore: number;
  handleUpdateScore: (score: number) => void;
}

function ScoreSelector({
  step = 1,
  min = 1,
  max = 5,
  selectedScore,
  handleUpdateScore,
}: ScoreSelectorProps) {
  return (
    <section className={styles.container}>
      <p className={styles.titleText}>점수 선택</p>
      <Slider
        value={selectedScore}
        aria-label="Score"
        valueLabelDisplay="auto"
        shiftStep={1}
        step={step}
        marks
        min={min}
        max={max}
        onChange={(_, value) => {
          handleUpdateScore(Number(value));
        }}
      />
    </section>
  );
}

export default ScoreSelector;
