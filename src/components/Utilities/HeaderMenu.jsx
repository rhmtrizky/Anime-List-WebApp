const HeaderMenu = ({ title }) => {
  return (
    <div className="flex justify-center items-center p-5">
      <h3 className="text-color-primary font-bold text-xl">{title}</h3>
    </div>
  );
};

export default HeaderMenu;
