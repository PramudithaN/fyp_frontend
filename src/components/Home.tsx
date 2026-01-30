import { Typography, Button, Card, Space } from 'antd';
import { RocketOutlined, LineChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

function Home() {
  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      background: '#0d1117', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '48px 24px'
    }}>
      <Space direction="vertical" size={32} align="center" style={{ maxWidth: 800 }}>
        <Space align="center" size={16}>
          <LineChartOutlined style={{ fontSize: 56, color: '#238636' }} />
          <Title level={1} style={{ color: '#e6edf3', margin: 0, fontSize: 48 }}>
            Oil Price Forecaster
          </Title>
        </Space>
        
        <Paragraph style={{ 
          color: '#8b949e', 
          fontSize: 18, 
          textAlign: 'center',
          maxWidth: 600,
          marginBottom: 0
        }}>
          Advanced machine learning predictions for Brent Crude Oil prices. 
          Get accurate forecasts to make informed decisions.
        </Paragraph>
        
        <Card 
          style={{ 
            background: '#161b22', 
            borderRadius: 12, 
            border: '1px solid #30363d',
            width: '100%',
            maxWidth: 500
          }}
        >
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <RocketOutlined style={{ fontSize: 32, color: '#238636', marginBottom: 16 }} />
              <Title level={4} style={{ color: '#e6edf3', marginBottom: 8 }}>
                Get Started
              </Title>
              <Text style={{ color: '#8b949e' }}>
                View the latest oil price forecasts and market analysis
              </Text>
            </div>
            
            <Link to="/dashboard" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<DashboardOutlined />}
                style={{ 
                  width: '100%',
                  height: 48,
                  background: '#238636',
                  borderColor: '#238636',
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                View Dashboard
              </Button>
            </Link>
          </Space>
        </Card>
        
        <Text style={{ color: '#6e7681', fontSize: 14 }}>
          Powered by Machine Learning • Real-time Data from Yahoo Finance
        </Text>
      </Space>
    </div>
  )
}

export default Home
