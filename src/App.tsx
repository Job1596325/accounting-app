import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useStore } from './store/useStore';
import { TransactionList } from './components/TransactionList';
import { Statistics } from './components/Statistics';
import { Settings } from './components/Settings';
import { AddTransaction } from './components/AddTransaction';

const App: React.FC = () => {
  const init = useStore((state) => state.init);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    init();
  }, [init]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">💰</div>
          <div className="text-xl font-semibold text-gray-700">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* 头部 */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              💰 小宝记账
            </h1>
          </div>
        </header>

        {/* 主内容 */}
        <main className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<TransactionList />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* 底部导航 */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-20 md:pb-0">
          <div className="max-w-4xl mx-auto flex justify-around">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-3 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-2xl mb-1">
                    {isActive ? '📝' : '📋'}
                  </span>
                  <span className="text-xs font-medium">明细</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-3 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-2xl mb-1">
                    {isActive ? '📊' : '📈'}
                  </span>
                  <span className="text-xs font-medium">统计</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-3 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-2xl mb-1">
                    {isActive ? '⚙️' : '🔧'}
                  </span>
                  <span className="text-xs font-medium">设置</span>
                </>
              )}
            </NavLink>
          </div>
        </nav>

        {/* 添加交易按钮 */}
        <AddTransaction />
      </div>
    </BrowserRouter>
  );
};

export default App;
