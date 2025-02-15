import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid2';
import { extendTheme, styled } from '@mui/material/styles';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import 'i18n';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useRoutes,
  useSearchParams,
} from 'react-router';

const NAVIGATION: Navigation = [
  {
    icon: <DashboardIcon />,
    kind: 'page',
    segment: 'dashboard',
    title: 'Dashboard',
  },
  {
    icon: <ShoppingCartIcon />,
    kind: 'page',
    segment: 'orders',
    title: 'Orders',
  },
];

const demoTheme = extendTheme({
  breakpoints: {
    values: {
      lg: 1200,
      md: 600,
      sm: 600,
      xl: 1536,
      xs: 0,
    },
  },
  colorSchemes: { dark: true, light: true },
  colorSchemeSelector: 'class',
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      navigate: (path: string | URL) => setPathname(String(path)),
      pathname,
      searchParams: new URLSearchParams(),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')<{ height: number }>(({ height, theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  content: '" "',
  height,
}));

const Home = () => <h1>Главная</h1>;
const About = () => <h1>О нас</h1>;
const NotFound = () => <h1>404 - Страница не найдена</h1>;

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{
        navigate: (url) => navigate(url),
        pathname,
        searchParams,
      }}
      theme={demoTheme}
    >
      <DashboardLayout
        branding={{
          logo: <AccountBalanceWalletIcon fontSize="large" />,
          title: t('AppName'),
        }}
      >
        <PageContainer>
          <Routes>
            <Route element={<Home />} path="/dashboard" />
            <Route element={<About />} path="/orders" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
