import Button from "components/shared/Button";
import Input from "components/shared/Input";
import Layout from "components/shared/Layout";
import Select from "components/shared/Select";
import styles from "./styles.module.scss";

const options = [
  "Architect",
  "Lighting Designer",
  "Student",
  "Installation professional",
  "Private person",
];

export default function Downloads() {
  return (
    <Layout lightHead>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.head}>
            <h1>Download your catalogue</h1>
          </div>
          <div className={styles.form}>
            <div className={styles.row}>
              <Input label="Name" />
              <Input label="Email" />
            </div>
            <div className={styles.row}>
              <Input label="Company" />
              <Select
                options={options.map((option) => ({
                  label: option,
                  value: option,
                }))}
              />
            </div>
            <div>
              <Button>Download</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
