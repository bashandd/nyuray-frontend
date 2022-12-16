import { useState, useEffect } from "react";
import { Layout } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
import { Form, Input, Row, Col, Button, List } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
//import SkillUpdateModal from "../../components/modal/SkillUpdateModal";
import { convertLegacyProps } from "antd/lib/button/button";

const { Content, Sider } = Layout;

function Skills() {

  // // state
   const [loading, setLoading] = useState(false);
   const [skills, setSkills] = useState([]);

  // //updating state
   const [updatingSkill, setUpdatingSkill] = useState({});
   const [openModal, setOpenModal] = useState(false);

  //hooks
  const [form] = Form.useForm();

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = async () => {
    try {
      const { data } = await axios.get("/skills");
      setSkills(data);
    } catch (e) {
      toast.error(e);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/skill", values);

      //to append data in the last swap data & ...categoes below
      setSkills([data, ...skills]); // to get the screen updated with data as sooon as we add it
      toast.success("Skill added successfully");
      setLoading(false);
      form.resetFields(["name"]);
    } catch (err) {
      console.log(err);
      toast.error("Skill addition failed");
      setLoading(false);
    }
  };

  const handleEdit = async (item) => {
    setUpdatingSkill(item);
    console.log (" I am here :handleEdit ");
    setOpenModal(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(
        `/skill/${updatingSkill.slug}`,
        values
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        const newSkills = skills.map((skill) => {
          if (skill._id === data._id) {
            return data;
          }
          return skill;
        });
        setSkills(newSkills);
        toast.success("Skiill updated successfully");
        setOpenModal(false);
        setUpdatingSkill({});
      }
    } catch (err) {
      toast.error("Skill update failed" + err);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/skill/${item.slug}`);

      setSkills(skills.filter((skill) => skill._id !== data._id));

      toast.success("Skill deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Skill delete failed");
    }
  };

  return (

    <AdminLayout>
      <Row>
        {/* first column  screen size => xs=extra small sm-small, lg=large */}

        <Col xs={22} sm={22} lg={10} offset={1}>
          <h1>Skills</h1>
          <p>Add new Skill</p>

          <Form onFinish={onFinish} form={form}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Skill name"
              />
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        {/* second column */}
        <Col xs={22} sm={22} lg={10} offset={1}>
          <List
            itemLayout="horizontal"
            dataSource={skills}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    edit
                  </a>,
                  <a
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    delete
                  </a>,
                ]}
              >
                <List.Item.Meta title={item.name} />
              </List.Item>
            )}
          ></List>
        </Col>
        <SkillUpdateModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleUpdate={handleUpdate}
          updatingSkill={updatingSkill}
        />
      </Row>
    </AdminLayout>
  );
}

export default Skills;
