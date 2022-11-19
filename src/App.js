import { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Divider,
  Row,
  Col,
  Input,
  Select,
  Card,
  Pagination
} from "antd"
import './App.css';
import DoctorCard from "./components/Card";
import { getDoctorList } from "./store/doctors/fetchData"
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { Content } = Layout;
  const { Title, Text } = Typography;
  const { Search } = Input; 

  const dispatch = useDispatch();
  const { 
    loading, 
    data, 
    selectedData, 
    uniqueSpecialization,
    uniqueHospital 
  } = useSelector((state) => state.doctors);
  const [keywordValue, setKeywordValue] = useState("");
  const [filter, setFilter] = useState({
    keyword: "",
    limit: 10,
    page: 1,
    hospital: [],
    specialization: []
  });

  useEffect(() => {
    setFilter({
      keyword: "",
      limit: 10,
      page: 1,
      hospital: [],
      specialization: []
    });
  }, []);

  useEffect(() => {
    dispatch(getDoctorList(filter));
  }, [filter]);

  const onSearch = (value) => {
    const data = {
      ...filter,
      page: 1,
      limit: 10,
      keyword: value
    };
    setFilter(data);
  };

  const handleSpecialization = (value) => {
    const data = {
      ...filter,
      page: 1,
      limit: 10,
      specialization: value
    }
    setFilter(data);
  };

  const handleHospital = (value) => {
    const data = {
      ...filter,
      page: 1,
      limit: 10,
      hospital: value
    }
    setFilter(data);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px" }}>
        <Title level={3}>Doctor Finder</Title>
        <Text keyboard>Just a random set of fake doctor data.</Text>
        <Divider />
        <Row gutter={[8,8]} style={{ marginBottom: "20px" }}>
          <Col xs={24} sm={24} md={8}>
            <Search 
              loading={loading}
              placeholder="Search by doctor name" 
              value={keywordValue} 
              onChange={(e) => setKeywordValue(e.target.value)}
              enterButton
              onSearch={onSearch}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Select
              loading={loading}
              mode="multiple"
              style={{
                width: '100%',
              }}
              placeholder="Please select the hospital"
              onChange={handleHospital}
              options={uniqueHospital}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Select
              loading={loading}
              mode="multiple"
              style={{
                width: '100%',
              }}
              placeholder="Please select specialization"
              onChange={handleSpecialization}
              options={uniqueSpecialization}
            />
          </Col>
        </Row>
        {
          selectedData.length !== 0 ? 
            <Row gutter={[24,24]}> 
              {selectedData.map((el, index) =>
              <Col xs={24} sm={24} md={12} key={index}>
                <DoctorCard loading={loading} data={el} key={index}/>
              </Col>
              )}
            </Row>
          : <Card
            hoverable
            loading={loading}
            style={{
              marginTop: 16,
            }}
          />
        }
        <Row justify="space-between" align="middle" style={{ margin: "20px 0" }}>
          <Pagination 
            loading={loading}
            total={data.length}
            showTotal={total => `Total ${total} items`}
            sortDirections={[false, "ascend","descend"]}
            pageSize={filter.limit}
            current={filter.page}
            showSizeChanger={true}
            onChange={(page, pageSize) => {
              setFilter({
                ...filter,
                page: filter.limit === pageSize ? page : 1,
                limit: pageSize || 10
              })
            }}
          />
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
