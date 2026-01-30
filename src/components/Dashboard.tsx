import { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Typography, 
  Space, 
  Button, 
  Statistic, 
  Row, 
  Col, 
  Tag, 
  Spin, 
  Alert,
  Divider,
  ConfigProvider,
  theme
} from 'antd';
import { 
  ReloadOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  DollarOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { PredictionResponse, Forecast } from '../types/api';

const { Title, Text } = Typography;

const API_URL = 'http://localhost:8002/predict';

function Dashboard() {
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: PredictionResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  const formatReturn = (returnValue: number): string => {
    const percentage = (returnValue * 100).toFixed(2);
    return `${returnValue >= 0 ? '+' : ''}${percentage}%`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const columns: ColumnsType<Forecast & { changeFromCurrent: number; changePercent: number }> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <Text style={{ color: '#e6edf3' }}>{formatDate(date)}</Text>
      ),
    },
    {
      title: 'Forecasted Price',
      dataIndex: 'forecasted_price',
      key: 'forecasted_price',
      render: (price: number) => (
        <Text strong style={{ fontFamily: 'monospace', fontSize: '15px', color: '#e6edf3' }}>
          ${formatPrice(price)}
        </Text>
      ),
    },
    {
      title: 'Return',
      dataIndex: 'forecasted_return',
      key: 'forecasted_return',
      render: (returnVal: number) => (
        <Tag 
          color={returnVal >= 0 ? 'success' : 'error'} 
          icon={returnVal >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          style={{ fontSize: '13px', padding: '4px 12px' }}
        >
          {formatReturn(returnVal)}
        </Tag>
      ),
    },
    {
      title: 'Change from Current',
      dataIndex: 'changeFromCurrent',
      key: 'changeFromCurrent',
      render: (_: number, record) => (
        <Space direction="vertical" size={0}>
          <Text style={{ color: record.changeFromCurrent >= 0 ? '#52c41a' : '#ff4d4f', fontWeight: 600 }}>
            {record.changeFromCurrent >= 0 ? '+' : ''}${formatPrice(record.changeFromCurrent)}
          </Text>
          <Text style={{ fontSize: '12px', color: '#8b949e' }}>
            ({record.changePercent >= 0 ? '+' : ''}{record.changePercent.toFixed(2)}%)
          </Text>
        </Space>
      ),
    },
    {
      title: 'Horizon',
      dataIndex: 'horizon',
      key: 'horizon',
      render: (horizon: number) => (
        <Tag color="blue" style={{ fontSize: '13px' }}>
          Day {horizon}
        </Tag>
      ),
      align: 'center',
    },
  ];

  // Dark theme configuration
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

  if (loading) {
    return (
      <ConfigProvider theme={darkTheme}>
        <div style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          background: '#0d1117'
        }}>
          <Spin size="large" tip="Loading predictions..." />
        </div>
      </ConfigProvider>
    );
  }

  if (error) {
    return (
      <ConfigProvider theme={darkTheme}>
        <div style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '48px',
          background: '#0d1117'
        }}>
          <Alert
            message="Error Loading Data"
            description={error}
            type="error"
            showIcon
            action={
              <Button size="small" type="primary" onClick={fetchPredictions}>
                Retry
              </Button>
            }
          />
        </div>
      </ConfigProvider>
    );
  }

  if (!data) {
    return (
      <ConfigProvider theme={darkTheme}>
        <div style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          background: '#0d1117'
        }}>
          <Alert message="No data available" type="info" showIcon />
        </div>
      </ConfigProvider>
    );
  }

  const priceChange = data.forecasts.length > 0 
    ? data.forecasts[0].forecasted_price - data.last_price 
    : 0;
  const priceChangePercent = data.last_price > 0 
    ? (priceChange / data.last_price) * 100 
    : 0;

  const tableData = data.forecasts.map((forecast, index) => ({
    ...forecast,
    key: index,
    changeFromCurrent: forecast.forecasted_price - data.last_price,
    changePercent: ((forecast.forecasted_price - data.last_price) / data.last_price) * 100,
  }));

  return (
    <ConfigProvider theme={darkTheme}>
      <div style={{ 
        minHeight: '100vh', 
        background: '#0d1117', 
        padding: '32px 48px',
      }}>
        {/* Header Section */}
        <div style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 14, display: 'block', marginBottom: 8, color: '#8b949e' }}>
            NY Mercantile - Delayed Quote - USD
          </Text>
          <Space align="center" size={16}>
            <LineChartOutlined style={{ fontSize: 32, color: '#238636' }} />
            <Title level={2} style={{ margin: 0, color: '#e6edf3' }}>
              Brent Crude Oil Last Day Financ (BZ=F)
            </Title>
          </Space>
        </div>

        {/* Price Statistics Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              bordered={false}
              style={{ background: '#161b22', borderRadius: 12 }}
            >
              <Statistic
                title={<Text style={{ color: '#8b949e' }}>Current Price</Text>}
                value={data.last_price}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#e6edf3', fontSize: 32, fontWeight: 600 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              bordered={false}
              style={{ background: '#161b22', borderRadius: 12 }}
            >
              <Statistic
                title={<Text style={{ color: '#8b949e' }}>Forecasted Change</Text>}
                value={priceChange}
                precision={2}
                prefix={priceChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                valueStyle={{ 
                  color: priceChange >= 0 ? '#52c41a' : '#ff4d4f', 
                  fontSize: 32, 
                  fontWeight: 600 
                }}
                suffix={<Text style={{ fontSize: 16, color: '#8b949e' }}>({priceChangePercent.toFixed(2)}%)</Text>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              bordered={false}
              style={{ background: '#161b22', borderRadius: 12 }}
            >
              <Statistic
                title={<Text style={{ color: '#8b949e' }}>Forecast Horizon</Text>}
                value={data.forecasts.length}
                suffix="days"
                valueStyle={{ color: '#1890ff', fontSize: 32, fontWeight: 600 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              bordered={false}
              style={{ background: '#161b22', borderRadius: 12 }}
            >
              <Statistic
                title={<Text style={{ color: '#8b949e' }}>Data Source</Text>}
                value={data.data_source.replace('Yahoo Finance ', '')}
                valueStyle={{ color: '#e6edf3', fontSize: 20, fontWeight: 500 }}
              />
              <Text style={{ fontSize: 12, color: '#8b949e' }}>
                As of {formatDate(data.last_price_date)}
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Refresh Button */}
        <div style={{ marginBottom: 24 }}>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />} 
            onClick={fetchPredictions}
            loading={loading}
            size="large"
            style={{ 
              background: '#238636',
              borderColor: '#238636',
              height: 44,
              paddingLeft: 24,
              paddingRight: 24,
              fontWeight: 500
            }}
          >
            Refresh Data
          </Button>
        </div>

        <Divider style={{ borderColor: '#30363d', margin: '24px 0' }} />

        {/* Forecasts Table */}
        <Card
          title={
            <Space>
              <LineChartOutlined style={{ color: '#238636' }} />
              <span style={{ color: '#e6edf3', fontWeight: 600, fontSize: 18 }}>Price Forecasts</span>
            </Space>
          }
          extra={<Text style={{ color: '#8b949e' }}>Currency in USD</Text>}
          bordered={false}
          style={{ 
            background: '#161b22', 
            borderRadius: 12,
          }}
          styles={{
            header: { borderBottom: '1px solid #30363d', padding: '16px 24px' },
            body: { padding: 0 }
          }}
        >
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            size="middle"
            style={{ background: '#161b22' }}
            rowClassName={() => 'forecast-table-row'}
          />
        </Card>

        {/* Custom styles for table */}
        <style>{`
          .forecast-table-row:hover td {
            background: #21262d !important;
          }
          .forecast-table-row td {
            border-bottom: 1px solid #21262d !important;
            padding: 16px 24px !important;
          }
          .ant-table-thead > tr > th {
            background: #0d1117 !important;
            border-bottom: 1px solid #30363d !important;
            color: #8b949e !important;
            font-weight: 600 !important;
            text-transform: uppercase !important;
            font-size: 12px !important;
            letter-spacing: 0.5px !important;
            padding: 16px 24px !important;
          }
          .ant-table {
            background: transparent !important;
          }
          .ant-spin-text {
            color: #8b949e !important;
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
}

export default Dashboard;
