import { Result } from 'antd';

export default function Custom404() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
    </div>
  );
}
