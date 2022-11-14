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
  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());
    const body = JSON.stringify(plainFormData);
    const rsp = await fetch("/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });
    if (rsp.ok) {
      setSubmitted(true);
      setBusy(false);
      e.target.reset();
    }
  };
  return (
    <Layout>
      <Head>
        <title>Download | {siteName}</title>
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
                <Input label="Company" type="text" name="company" />
              </div>
              <Select
                options={options.map((option) => ({
                  label: option,
                  value: option,
                }))}
                name="occupation"
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
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              We thank you for your interest in Déess.
            </Typography>
            <Typography>
              You will receive an email soon, with a link to download our
              latetst catalogue
            </Typography>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
}
