import React, { useState } from 'react';
import { exportData, importData, clearAllData } from '../utils/db';
import { useStore } from '../store/useStore';

export const Settings: React.FC = () => {
  const [importing, setImporting] = useState(false);
  const init = useStore((state) => state.init);

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `xiaobao-accounting-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('数据导出成功！');
    } catch (error) {
      console.error('Export error:', error);
      alert('导出失败，请重试');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      await importData(text);
      await init();
      alert('数据导入成功！');
    } catch (error) {
      console.error('Import error:', error);
      alert('导入失败，请检查文件格式');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  const handleClearData = async () => {
    if (
      window.confirm(
        '确定要清空所有数据吗？此操作不可恢复！\n\n建议先导出数据备份。'
      )
    ) {
      if (window.confirm('再次确认：真的要删除所有记账数据吗？')) {
        try {
          await clearAllData();
          await init();
          alert('数据已清空');
        } catch (error) {
          console.error('Clear error:', error);
          alert('清空失败，请重试');
        }
      }
    }
  };

  return (
    <div className="pb-20">
      <div className="bg-white">
        {/* 数据管理 */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">数据管理</h3>

          <div className="space-y-3">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-lg active:bg-blue-100"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">📤</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">导出数据</div>
                  <div className="text-sm text-gray-600">
                    将数据导出为JSON文件
                  </div>
                </div>
              </div>
            </button>

            <label className="w-full flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg active:bg-green-100 cursor-pointer">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📥</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {importing ? '导入中...' : '导入数据'}
                  </div>
                  <div className="text-sm text-gray-600">
                    从JSON文件导入数据
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={importing}
                className="hidden"
              />
            </label>

            <button
              onClick={handleClearData}
              className="w-full flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-lg active:bg-red-100"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🗑️</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">清空数据</div>
                  <div className="text-sm text-gray-600">
                    删除所有记账记录
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 关于 */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">关于</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center justify-between py-2">
              <span>应用名称</span>
              <span className="font-semibold">小宝记账</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>版本</span>
              <span className="font-semibold">1.0.0</span>
            </div>
            <div className="py-2">
              <p className="text-sm leading-relaxed">
                小宝记账是一款简单易用的记账应用，支持收入支出记录、分类管理、统计分析等功能。
                所有数据保存在本地，保护您的隐私安全。
              </p>
            </div>
            <div className="py-2">
              <p className="text-sm text-gray-500">
                💡 提示：可以将本应用添加到手机主屏幕，像原生应用一样使用。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
