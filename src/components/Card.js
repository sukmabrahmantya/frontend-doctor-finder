import {
  Badge,
  Card,
  Divider,
  Row,
  Col,
  Typography
} from "antd";
import { useSelector } from "react-redux";

function CardDoctor(props) {
  const { data } = props;
  const { Title, Text } = Typography;
  const { loading } = useSelector((state) => state.doctors);
  const { Ribbon } = Badge;

  return (
    <Ribbon text="Popular" style={{ display: data && data.is_popular ? "unset" : "none" }}>
      <Card
        hoverable
        loading={loading}
      >
        <Row gutter={[8,8]}>
          <Col span={8}>
            <img 
              alt="thumbnail" 
              style={{ width: "100%" }}
              src={data && data.photo.formats.thumbnail} 
            />
          </Col>
          <Col span={16}>
            <Title level={5}> {data && data.name} </Title>
            <Text italic> {data && data.hospital[0].name} - {data && data.specialization.name} </Text>
            <Divider />
            <div style={{ overflowWrap: "break-word", hyphens: "auto", textAlign: "justify" }} dangerouslySetInnerHTML={{__html: data && data.about}} />
            <Text strong italic style={{float: 'right'}} > {data && data.price.formatted} </Text>
          </Col>
        </Row>
      </Card>
    </Ribbon>
  )
}

export default CardDoctor;