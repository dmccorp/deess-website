import { CircularProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "components/shared/Button";
import Input from "components/shared/Input";
import Layout from "components/shared/Layout";
import Select from "components/shared/Select";
import { siteName } from "lib/constants";
import Head from "next/head";
import { useState } from "react";
import styles from "./styles.module.scss";

const options = [
  "Architect",
  "Lighting Designer",
  "Student",
  "Installation professional",
  "Private person",
];

export default function Downloads() {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
    }, 2000);
  };
  return (
    <Layout>
      <Head>
        <title>Download - {siteName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.head}>
            <h1>Download your catalogue</h1>
          </div>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <Input label="Name" name="name" type="text" required />
              </div>
              <div className={styles.field}>
                <Input label="Email" name="email" type="email" required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <Input label="Company" type="text" />
              </div>
              <Select
                options={options.map((option) => ({
                  label: option,
                  value: option,
                }))}
                name="type"
              />
            </div>
            <div>
              <Button>
                {busy ? (
                  <div
                    style={{
                      display: "flex",
                      height: "50px",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress sx={{ color: "white" }} size={25} />
                  </div>
                ) : (
                  "Download"
                )}
              </Button>
            </div>
          </form>
        </div>
        <Modal open={submitted} onClose={() => setSubmitted(false)}>
          <Box
            sx={{
              p: 3,
              bgcolor: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: 2,
              boxShadow: 10,
            }}
          >
            <h3>We thank you for your interest in Deess.</h3>
            <p>
              You will receive an email soon, with a link to download our
              latetst catalogue
            </p>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
}
