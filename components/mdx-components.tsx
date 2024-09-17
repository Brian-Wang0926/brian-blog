import Images from "next/image";
import * as runtime from "react/jsx-runtime";

const useMDXComponents = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Images,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponents(code);
  return <Component components={components} />;
}
