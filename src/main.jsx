import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '@/Layout.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from '@/redux/config/configStore';
import './index.css'
import HomePage from '@/routes/HomePage';
import JoinPage from '@/routes/JoinPage';
import LoginPage from '@/routes/LoginPage';
import PostDetailPage from '@/routes/PostDetailPage';
import ErrorPage from '@/routes/ErrorPage';
import PostWritePage from '@/routes/PostWritePage';
import PostUpdatePage from '@/routes/PostUpdatePage';
import AuthPage from '@/routes/AuthPage';

const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path:"/",
                element: <HomePage/>,
            },
            {
                path:"/join",
                element: <JoinPage/>,
            },
            {
                path:"/login",
                element: <LoginPage/>,
            },
            {
                path:"p/:postId",
                element: <PostDetailPage/>,
                errorElement: <ErrorPage/>
            },
            {
                path:"m/write",
                element: <AuthPage><PostWritePage/></AuthPage>,
            },
            {
                path:"m/update/:postId",
                element: <AuthPage><PostUpdatePage/></AuthPage>,
            },

        ]
    }
]);



const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </Provider>,
)
