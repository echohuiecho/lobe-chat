import { ActionIcon, Select, type SelectProps } from '@lobehub/ui';
import { isString } from 'lodash-es';
import { Wand2 } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export interface AutoGenerateInputProps extends SelectProps {
  canAutoGenerate?: boolean;
  loading?: boolean;
  onGenerate?: () => void;
}

const AutoGenerateSelect = memo<AutoGenerateInputProps>(
  ({ loading, onGenerate, value, canAutoGenerate, ...props }) => {
    const { t } = useTranslation('common');

    return (
      <Select
        mode="tags"
        open={false}
        style={{ width: '100%' }}
        suffixIcon={
          onGenerate && (
            <ActionIcon
              disabled={!canAutoGenerate}
              icon={Wand2}
              loading={loading}
              onClick={onGenerate}
              size={'small'}
              style={{
                marginRight: -4,
              }}
              title={!canAutoGenerate ? t('autoGenerateTooltipDisabled') : t('autoGenerate')}
              variant={'filled'}
            />
          )
        }
        tokenSeparators={[',', '，', ' ']}
        value={isString(value) ? value.split(',') : value}
        {...props}
      />
    );
  },
);

export default AutoGenerateSelect;
