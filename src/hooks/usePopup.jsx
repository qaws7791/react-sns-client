import Button from "@/components/Button";
import { useCallback } from "react";
import { createRoot } from "react-dom/client";


const usePopup = () => {
  const createContainer = useCallback(() => {
    const container = document.getElementById("popupContainer")
    if(container) return container
    const containerDiv = document.createElement('div')
    containerDiv.id = 'popupContainer'
    document.body.appendChild(containerDiv)
    return containerDiv
  },[])

  const openPopup = useCallback(({ title, contents, type='alert' }) => {
    const root = createRoot(createContainer());
    return new Promise((resolve) => {

      const handleConfirm = () => {
        root.unmount()
        resolve(true);
        
      };

      const handleCancel = () => {
        root.unmount()
        resolve(false);

      };

      root.render(
        <div>
          <div className="popup-bg" onClick={handleCancel}></div>
          <div className="popup">
          <h2>{title}</h2>
          <div>{contents}</div>
          <div className="popup-btns">
          <Button onClick={handleConfirm}>확인</Button>
          {type === 'confirm' && <Button onClick={handleCancel}>취소</Button>}
          </div>
          </div>
        </div>)
    });
  },[createContainer]);

  return [openPopup];
};




export default usePopup;
