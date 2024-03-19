import { MenuOutlined, SearchOutlined } from "@ant-design/icons";

const Header = (props: { onOpenModal: () => void }) => {
  const { onOpenModal } = props;
  return (
    <header>
      <div className="content">
        <div>
          <MenuOutlined />
        </div>
        <h4>ngmusic</h4>
        <div>
          <SearchOutlined onClick={onOpenModal} />
        </div>
      </div>
    </header>
  );
};

export default Header;
