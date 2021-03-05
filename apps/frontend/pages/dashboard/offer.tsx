import { Layout } from "../../components/Layout/Layout";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { AuthChecker } from "../../components/AuthChecker/AuthChecker";
import { AddOffer } from "../../views/AddOffer/AddOffer";
import { useSelector } from "react-redux";
import { getEditingOfferStatus } from "../../store/offersSlice";

const Offer = () => {
  const editingOfferInfo = useSelector(getEditingOfferStatus);
  return (
    <AuthChecker>
      <Layout
        title={`${editingOfferInfo.value ? "Update" : "Create"} an offer`}
        headerTitle={`${editingOfferInfo.value ? "Update" : "Create"} an offer`}
      >
        <ActionButton icon="back" corner />
        <AddOffer
          offer={editingOfferInfo.offer}
          isEditing={editingOfferInfo.value}
        />
      </Layout>
    </AuthChecker>
  );
};

export default Offer;
