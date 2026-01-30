import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Layout, Menu, ConfigProvider, theme } from 'antd'
import { 
  HomeOutlined, 
  DashboardOutlined, 
  InfoCircleOutlined 
} from '@ant-design/icons'
import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'

const { Header, Content } = Layout;

function App() {
  const location = useLocation();

  const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#238636',
      colorBgContainer: '#161b22',
      colorBgElevated: '#21262d',
      colorBorder: '#30363d',
      colorText: '#e6edf3',
      colorTextSecondary: '#8b949e',
      borderRadius: 8,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
  ];

  return (
    <ConfigProvider theme={darkTheme}>
      <Layout style={{ minHeight: '100vh', background: '#0d1117' }}>
        <Header 
          style={{ 
            background: '#161b22', 
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ 
              background: 'transparent', 
              borderBottom: 'none',
              flex: 1,
              justifyContent: 'center',
              maxWidth: 500,
            }}
          />
        </Header>
        
        <Content style={{ background: '#0d1117' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
