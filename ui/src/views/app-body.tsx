import { useAtomValue } from 'jotai';
import { currentToolAtom, progressAtom } from '~/atom/primitive';
import { Progress } from '~/components';
import { useT } from '~/hooks';
import { ScanResultTable } from './scan-result-table';

export function AppBody() {
  const t = useT();
  const progress = useAtomValue(progressAtom);
  const currentTool = useAtomValue(currentToolAtom);

  return (
    <div className="flex-1 flex flex-col w-full h-px pb-[3px]">
      <ScanResultTable className="flex-1 rounded-none border-none grow" />
      {progress.tool === currentTool && (
        <div className="h-20 border-t px-3">
          {progress.stopping ? (
            <div className="h-full flex justify-center items-center">
              {t('stoppingScan')}
            </div>
          ) : (
            <>
              <div className="text-center h-6">{progress.data.stepName}</div>
              <ProgressWrap
                label={t('currentStage')}
                value={progress.data.currentProgress}
              />
              <ProgressWrap
                label={t('allStages')}
                value={progress.data.allProgress}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ProgressWrap(props: { label: string; value: number }) {
  const { label, value } = props;
  const indeterminate = value < -0.001;

  return (
    <div className="flex items-center">
      <div className="shrink-0 w-28">{label}:</div>
      {indeterminate ? (
        <div className="relative h-2 w-full overflow-hidden bg-primary/20">
          <div className="h-full w-1/3 bg-primary animate-indeterminate" />
        </div>
      ) : (
        <Progress value={value} />
      )}
      <div className="w-12 shrink-0 text-right">
        {indeterminate ? '-' : `${value}%`}
      </div>
    </div>
  );
}
