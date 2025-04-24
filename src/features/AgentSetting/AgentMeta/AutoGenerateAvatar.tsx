import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Wand2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';
import { globalGeneralSelectors } from '@/store/global/selectors';

const EmojiPicker = dynamic(() => import('@lobehub/ui/es/EmojiPicker'), { ssr: false });

export interface AutoGenerateAvatarProps {
  background?: string;
  canAutoGenerate?: boolean;
  loading?: boolean;
  onChange?: (value: string) => void;
  onGenerate?: () => void;
  value?: string;
}

const AutoGenerateAvatar = memo<AutoGenerateAvatarProps>(
  ({ loading, background, value, onChange, onGenerate, canAutoGenerate }) => {
    const { t } = useTranslation('common');
    const theme = useTheme();
    const locale = useGlobalStore(globalGeneralSelectors.currentLanguage);

    return (
      <Flexbox
        align={'center'}
        gap={2}
        horizontal
        padding={6}
        style={{
          background: theme.colorBgContainer,
          border: `1px solid ${theme.colorBorderSecondary}`,
          borderRadius: 32,
          minHeight: 60,
          minWidth: 86,
        }}
      >
        <EmojiPicker
          background={background || theme.colorFillTertiary}
          locale={locale}
          onChange={onChange}
          size={48}
          style={{
            background: theme.colorFillTertiary,
            opacity: loading ? 0.6 : undefined,
          }}
          value={value}
        />
        <ActionIcon
          disabled={!canAutoGenerate}
          icon={Wand2}
          loading={loading}
          onClick={onGenerate}
          size="small"
          title={!canAutoGenerate ? t('autoGenerateTooltipDisabled') : t('autoGenerate')}
        />
      </Flexbox>
    );
  },
);

export default AutoGenerateAvatar;
