interface Props {
  jobId?: string;
}

const page = ({ jobId }: Props) => {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left">
            <span className="font-normal text-gray-600">
              Write follow up emails
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default page;
