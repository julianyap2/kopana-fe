import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { KopanaApi } from "api";

const AddSetoranPokok = () => {
  const [member, setMember] = useState([]);
  const [selectMember, setSelectember] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setIsLoading] = useState(true);

  async function validateForm() {
    return tanggal.length > 0 && deskripsi.length > 0;
  }

  const selectMembers = async () => {
    try {
      const response = await Kopana.get(`/member`);
      console.log(response.data.data);
      setMember(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    selectMembers();
  }, []);

  async function handleSubmit(event) {

    event.preventDefault();
    if (selectMember === "test" || selectMember === "") {
      alert("Silangkah Pilih member")
    } else {
      const data = {
        tanggal: tanggal,
        deskripsi: deskripsi,
        memberId: selectMember
      };

      const res = await KopanaApi.post('/setoranpokok', data);
      console.log(res);
    }

  }

  return loading ? (
    <>Loading</>
  ) : (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="member">
          <Form.Label style={{ marginRight: "10px" }}>Member</Form.Label>
          <Form.Control
            as="select"
            // defaultValue={member[0]._id}
            onChange={(e) =>
              setSelectember(e.target.value)
            }
          >
            <option value="test">Silahkan Pilih member</option>
            {member.map((d) => (
              <option key={d._id} value={d._id}>{d.nama}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group size="lg" controlId="tanggal">
          <Form.Label style={{ marginRight: "10px" }}>tanggal</Form.Label>
          <Form.Control
            autoFocus
            type="datetime-local"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label style={{ marginRight: "10px" }}>desskripsi</Form.Label>
          <Form.Control
            type="text"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </Form.Group>
        <Button
          style={{ marginTop: "10px" }}
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
          input
        </Button>
      </Form>
    </div>
  );
};

export default AddSetoranPokok;
