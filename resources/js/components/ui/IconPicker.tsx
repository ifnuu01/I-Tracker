import * as LucideIcons from 'lucide-react';
import ICON_OPTIONS from '../../constants/iconItems';

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
  error?: string;
}

const IconPicker = ({ value, onChange, error }: IconPickerProps) => {
  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<any>;
    if (!IconComponent) return null;
    return <IconComponent className="text-2xl" />;
  };

  return (
    <div>
      <div className="mb-2 font-semibold mt-4">Pilih Icon</div>
      <div className="grid grid-cols-5 gap-3">
        {ICON_OPTIONS.map((iconCode: string) => (
          <button
            type="button"
            key={iconCode}
            onClick={() => onChange(iconCode)}
            className={`border rounded-lg p-2 flex items-center justify-center transition cursor-pointer hover:border-black ${value === iconCode ? "border-black bg-gray-100" : "border-gray-200"
              }`}
          >
            {renderIcon(iconCode)}
          </button>
        ))}
      </div>
      {value && (
        <div className="mt-2 text-sm text-gray-500">
          Kode icon: <span className="font-mono">{value}</span>
        </div>
      )}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default IconPicker;
