const { default: Loader } = require("./Loader");

const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-full min-h-screen">
    <Loader />
  </div>
)

export default PageLoader;