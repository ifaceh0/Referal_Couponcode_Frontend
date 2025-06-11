import React, { useRef } from 'react';
import { Row, Col, Card, Table, Tag } from 'antd';
import { Bar, Funnel } from '@ant-design/charts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar as ChartBar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ShopOwnerDashboard = () => {
  // 1. Total Referrals Over Time (Bar Chart)
  const referralsData = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Referrals',
        data: [45, 60, 75, 82, 78, 95, 110, 105, 120, 130, 145, 160],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const referralsOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: 'Referrals Last 12 Months',
        font: { size: 16 }
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Referrals' } }
    }
  };

  // 2. Top Referrers Table
  const topReferrersColumns = [
    { title: 'Referrer', dataIndex: 'name', key: 'name' },
    { title: 'Referrals', dataIndex: 'count', key: 'count', sorter: (a, b) => a.count - b.count },
    { title: 'Conversion', dataIndex: 'conversion', key: 'conversion', render: text => `${text}%` }
  ];

  const topReferrersData = [
    { key: '1', name: 'John Smith', count: 42, conversion: 68 },
    { key: '2', name: 'Emma Johnson', count: 38, conversion: 72 },
    { key: '3', name: 'Michael Brown', count: 35, conversion: 65 },
    { key: '4', name: 'Sarah Davis', count: 31, conversion: 61 },
    { key: '5', name: 'David Wilson', count: 28, conversion: 75 },
    { key: '6', name: 'Lisa Miller', count: 25, conversion: 64 },
    { key: '7', name: 'James Taylor', count: 22, conversion: 59 },
    { key: '8', name: 'Linda Anderson', count: 19, conversion: 68 },
    { key: '9', name: 'Robert Thomas', count: 17, conversion: 71 },
    { key: '10', name: 'Karen Jackson', count: 14, conversion: 63 }
  ];

  // 3. Referral Conversion Rate (KPI Tile)
  const conversionRate = 67.5; // Example conversion rate percentage

  // 4. Referral Funnel Chart
  const funnelData = [
    { stage: 'Referred', value: 1000 },
    { stage: 'Signed Up', value: 650 },
    { stage: 'Purchased', value: 420 }
  ];

  const funnelConfig = {
    data: funnelData,
    xField: 'stage',
    yField: 'value',
    legend: false,
    label: {
      formatter: (datum) => `${datum.stage}: ${datum.value}`,
      position: 'middle'
    },
    conversionTag: {
      formatter: (datum) => `${((datum.value / funnelData[0].value) * 100).toFixed(1)}%`
    },
    height: 250
  };

  // 5. Detailed Referral List Table
  const referralColumns = [
    { title: 'Referrer', dataIndex: 'referrer', key: 'referrer' },
    { title: 'Referred', dataIndex: 'referred', key: 'referred' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: status => (
        <Tag color={
          status === 'Purchased' ? 'green' : 
          status === 'Signed Up' ? 'blue' : 'orange'
        }>
          {status}
        </Tag>
      )
    },
    { title: 'Date', dataIndex: 'date', key: 'date' }
  ];

  const referralData = [
    { key: '1', referrer: 'John Smith', referred: 'user1@email.com', status: 'Purchased', date: '2023-06-15' },
    { key: '2', referrer: 'Emma Johnson', referred: 'user2@email.com', status: 'Signed Up', date: '2023-06-14' },
    { key: '3', referrer: 'Michael Brown', referred: 'user3@email.com', status: 'Referred', date: '2023-06-12' },
    { key: '4', referrer: 'Sarah Davis', referred: 'user4@email.com', status: 'Purchased', date: '2023-06-10' },
    { key: '5', referrer: 'David Wilson', referred: 'user5@email.com', status: 'Purchased', date: '2023-06-08' },
  ];

  return (
    <div className="shop-owner-dashboard" style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {/* Conversion Rate KPI Tile */}
        <Col span={6}>
          <Card title="Conversion Rate" bordered={false}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1890ff' }}>
              {conversionRate}%
            </div>
            <div style={{ marginTop: '10px', color: '#666' }}>
              <span style={{ color: conversionRate > 65 ? '#52c41a' : '#f5222d' }}>
                {conversionRate > 65 ? '↑' : '↓'} {(Math.abs(conversionRate - 65)).toFixed(1)}%
              </span> vs last month
            </div>
          </Card>
        </Col>

        {/* Referral Trends Chart */}
        <Col span={18}>
          <Card title="Referral Trends" bordered={false}>
            <ChartBar options={referralsOptions} data={referralsData} />
          </Card>
        </Col>

        {/* Funnel Chart */}
        <Col span={12}>
          <Card title="Referral Funnel" bordered={false}>
            <Funnel {...funnelConfig} />
          </Card>
        </Col>

        {/* Top Referrers Table */}
        <Col span={12}>
          <Card title="Top Referrers" bordered={false}>
            <Table 
              columns={topReferrersColumns}
              dataSource={topReferrersData}
              pagination={false}
              size="small"
              scroll={{ y: 250 }}
            />
          </Card>
        </Col>

        {/* Detailed Referral List */}
        <Col span={24}>
          <Card title="Referral Activity" bordered={false}>
            <Table 
              columns={referralColumns}
              dataSource={referralData}
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ShopOwnerDashboard;