import SafePreview from "lib/components/SafePreview";
import { assetHost } from "lib/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import { components } from "react-select";
import Async from "react-select/async";
import searchIcon from "../search.svg";
import styles from "./styles.module.scss";

function DropdownIndicator({ selectProps }) {
  const { light } = selectProps;
  return (
    <div className={styles.icon}>
      <Image
        width={14}
        height={14}
        src={searchIcon.src}
        alt="Search"
        style={light ? { filter: "invert(1)" } : null}
      />
    </div>
  );
}

function Preview({ product }) {
  const image = product.attributes.images.data[0].attributes;
  const thumb = `${assetHost}${image.formats.thumbnail.url}`;
  return (
    <Image
      src={thumb}
      width={30}
      height={36}
      objectFit="cover"
      alt={image.alternativeText}
    />
  );
}

function Option(props) {
  return (
    <components.Option {...props}>
      <div className={styles.row}>
        <div className={styles.thumb}>
          <SafePreview width={30} height={30}>
            <Preview product={props.data} />
          </SafePreview>
        </div>
        <div className={styles.text}>
          <div className={styles.title}>{props.children}</div>
          <div className={styles.sub}>
            {props.data.attributes.categories.data
              .map((category) => category.attributes.name)
              .join(", ")}
          </div>
        </div>
      </div>
    </components.Option>
  );
}

export default function Search({
  loadOptions,
  onInputChange,
  results,
  search,
  light,
}) {
  const router = useRouter();
  return (
    <Async
      styles={{
        control: (base) => ({
          ...base,
          background: "transparent",
          borderRadius: "24px",
          padding: "0 10px",
          minHeight: "44px",
        }),
        input: (base) => ({
          ...base,
          color: light ? "#fff" : "#000",
          fontSize: "14px",
        }),
        option: (base, { isSelected, isFocused }) => ({
          ...base,
          background: isSelected || isFocused ? "#F0F0F0" : "initial",
        }),
      }}
      onInputChange={onInputChange}
      defaultOptions={results}
      inputValue={search}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator,
        Option,
      }}
      light={light}
      onChange={(option) => router.push(`/products/${option.attributes.slug}`)}
      getOptionLabel={(product) => product.attributes.name}
      getOptionValue={(product) => product.attributes.slug}
      loadOptions={loadOptions}
      noOptionsMessage={() => null}
    />
  );
}
