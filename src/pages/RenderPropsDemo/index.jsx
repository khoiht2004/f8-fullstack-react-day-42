import DataFetcher from "@/components/DataFetcher";
import { useNavigate } from "react-router";
import "./RenderPropsDemo.css";

function RenderProps() {
  const navigate = useNavigate();

  return (
    <div className="render-props-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <h2 className="render-props-title">Render Props Demo</h2>

      {/* Posts List */}
      <div className="demo-section">
        <h3 className="section-title">Posts List</h3>
        <DataFetcher url="/posts?_limit=5">
          {({ data, loading, error }) => {
            if (loading)
              return <div className="loading-message">Đang tải dữ liệu</div>;
            if (error) return <div className="error-message">Lỗi: {error}</div>;

            return (
              <ul className="data-list">
                {data &&
                  data.map((post) => (
                    <li key={post.id}>
                      <div className="post-title">{post.title}</div>
                    </li>
                  ))}
              </ul>
            );
          }}
        </DataFetcher>
      </div>

      {/* Users List */}
      <div className="demo-section">
        <h3 className="section-title">Users List</h3>
        <DataFetcher url="/users?_limit=3">
          {({ data, loading, error }) => {
            if (loading)
              return <div className="loading-message">Đang tải dữ liệu</div>;
            if (error) return <div className="error-message">Lỗi: {error}</div>;

            return (
              <ul className="data-list">
                {data &&
                  data.map((user) => (
                    <li key={user.id}>
                      <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            );
          }}
        </DataFetcher>
      </div>
    </div>
  );
}

export default RenderProps;
