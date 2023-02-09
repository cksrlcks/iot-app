import React from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/route/ProtectedRoute';
import Root from './pages/root';
import Login from './pages/login';
import Control from './pages/control';
import Menu from './pages/menu';
import Home from './pages/home';
import NotFound from './pages/error/NotFound';
import Outlet from './components/route/Outlet';
import Notice from './pages/notice';
import NoticeList from './pages/notice/List';
import NoticeView from './pages/notice/View';
import Log from './pages/log';
import LogList from './pages/log/List';
import Terminal from './pages/terminal';
import TerminalList from './pages/terminal/List';
import TerminalDetail from './pages/terminal/View';
import Region from './pages/region';
import RegionList from './pages/region/List';
import RegionView from './pages/region/View';
import RegionLinkList from './pages/region/Link';
import Message from './pages/message';
import MessageList from './pages/message/SettingList';
import MessageView from './pages/message/SettingView';
import MessagePush from './pages/message/PushList';
import MessageSms from './pages/message/SmsList';
import Drive from './pages/drive';
import DriveList from './pages/drive/List';
import DriveView from './pages/drive/View';
import Setting from './pages/setting';
import SettingView from './pages/setting/View';

import './assets/scss/style.scss';
import 'remixicon/fonts/remixicon.css';
import 'react-spring-bottom-sheet/dist/style.css';
import { LangProvider } from './context/LangContext';

const router = createHashRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/home',
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/control',
                element: (
                    <ProtectedRoute>
                        <Control />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/menu',
                element: (
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Menu />,
                    },
                    {
                        path: 'terminal',
                        element: <Terminal />,
                        children: [
                            { index: true, element: <TerminalList /> },
                            { path: ':id', element: <TerminalDetail /> },
                        ],
                    },
                    {
                        path: 'notice',
                        element: <Notice />,
                        children: [
                            { index: true, element: <NoticeList /> },
                            { path: ':id', element: <NoticeView /> },
                        ],
                    },
                    {
                        path: 'log',
                        element: <Log />,
                        children: [{ index: true, element: <LogList /> }],
                    },
                    {
                        path: 'region',
                        element: <Region />,
                        children: [
                            { index: true, element: <RegionList /> },
                            { path: 'write', element: <RegionView /> },
                            { path: ':id', element: <RegionView /> },
                            { path: 'link/:id', element: <RegionLinkList /> },
                        ],
                    },
                    {
                        path: 'message',
                        element: <Message />,
                        children: [
                            {
                                path: 'list',
                                children: [
                                    { index: true, element: <MessageList /> },
                                    { path: ':id', element: <MessageView /> },
                                ],
                            },

                            { path: 'push', element: <MessagePush /> },
                            { path: 'sms', element: <MessageSms /> },
                        ],
                    },
                    {
                        path: 'drive',
                        element: <Drive />,
                        children: [
                            { index: true, element: <DriveList /> },
                            { path: ':id', element: <DriveView /> },
                        ],
                    },
                    {
                        path: 'setting',
                        element: <Setting />,
                        children: [{ index: true, element: <SettingView /> }],
                    },
                ],
            },
        ],
    },
]);

export default function App() {
    return (
        <AuthProvider>
            <LangProvider>
                <RouterProvider router={router} />
            </LangProvider>
        </AuthProvider>
    );
}
