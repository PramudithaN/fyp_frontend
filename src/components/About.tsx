import { Typography, Card, Space, List, Row, Col } from 'antd';
import { 
  CheckCircleOutlined, 
  ThunderboltOutlined, 
  CodeOutlined, 
  ApiOutlined,
  LineChartOutlined,
  CloudServerOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function About() {
  const features = [
    { icon: <ThunderboltOutlined style={{ color: '#faad14' }} />, text: 'React 18+ with TypeScript' },
    { icon: <ThunderboltOutlined style={{ color: '#faad14' }} />, text: 'Vite for fast development' },
    { icon: <ApiOutlined style={{ color: '#1890ff' }} />, text: 'React Router for navigation' },
    { icon: <CodeOutlined style={{ color: '#52c41a' }} />, text: 'Hot Module Replacement (HMR)' },
    { icon: <CloudServerOutlined style={{ color: '#eb2f96' }} />, text: 'Ant Design UI Components' },
  ];

  const techStack = [
    { title: 'Frontend', items: ['React 18', 'TypeScript', 'Ant Design', 'Vite'] },
    { title: 'Backend', items: ['Python', 'FastAPI', 'Machine Learning'] },
    { title: 'Data', items: ['Yahoo Finance API', 'Real-time Data', 'Historical Analysis'] },
  ];

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)', 
      background: '#0d1117', 
      padding: '48px 24px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Space direction="vertical" size={32} style={{ maxWidth: 900, width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <LineChartOutlined style={{ fontSize: 48, color: '#238636', marginBottom: 16 }} />
          <Title level={2} style={{ color: '#e6edf3', marginBottom: 8 }}>
            About This Project
          </Title>
          <Paragraph style={{ color: '#8b949e', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            A modern web application for Brent Crude Oil price forecasting using machine learning.
          </Paragraph>
        </div>

        <Card 
          style={{ 
            background: '#161b22', 
            borderRadius: 12, 
            border: '1px solid #30363d'
          }}
        >
          <Title level={4} style={{ color: '#e6edf3', marginBottom: 24 }}>
            <CheckCircleOutlined style={{ color: '#238636', marginRight: 12 }} />
            Features
          </Title>
          <List
            dataSource={features}
            renderItem={(item) => (
              <List.Item style={{ borderBottom: '1px solid #21262d', padding: '12px 0' }}>
                <Space>
                  {item.icon}
                  <Text style={{ color: '#e6edf3' }}>{item.text}</Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>

        <Row gutter={[24, 24]}>
          {techStack.map((stack, index) => (
            <Col xs={24} md={8} key={index}>
              <Card 
                title={<span style={{ color: '#e6edf3' }}>{stack.title}</span>}
                style={{ 
                  background: '#161b22', 
                  borderRadius: 12, 
                  border: '1px solid #30363d',
                  height: '100%'
                }}
                styles={{ header: { borderBottom: '1px solid #30363d' } }}
              >
                <Space direction="vertical" size={8}>
                  {stack.items.map((item, i) => (
                    <Text key={i} style={{ color: '#8b949e' }}>• {item}</Text>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', paddingTop: 16 }}>
          <Text style={{ color: '#6e7681', fontSize: 14 }}>
            Built with ❤️ for Final Year Project
          </Text>
        </div>
      </Space>
    </div>
  )
}

export default About
