import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface TaskAttachmentsFieldProps {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

export function TaskAttachmentsField({ files, onChange, error }: TaskAttachmentsFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(Array.from(e.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#ececf1] mb-1.5">
        Attachments
      </label>
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 rounded-lg bg-[#40414f] border border-gray-600 
          text-gray-400 hover:text-[#ececf1] hover:border-[#10a37f] transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {files.length > 0 && (
          <ul className="mt-2 divide-y divide-gray-700">
            {files.map((file, index) => (
              <li key={index} className="py-2 flex items-center justify-between">
                <span className="text-sm text-[#ececf1]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}