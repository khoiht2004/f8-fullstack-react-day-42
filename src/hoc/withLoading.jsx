/* eslint-disable no-unused-vars */
function withLoading(WrappedComponent) {
  return (props) => {
    const { isLoading, ...restProps } = props;

    if (isLoading === true) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>
      );
    }

    if (isLoading === false) {
      return <WrappedComponent {...restProps} />;
    }

    return null;
  };
}

export default withLoading;
