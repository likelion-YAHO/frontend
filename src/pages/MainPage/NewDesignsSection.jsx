import newdesigns01 from "../../assets/images/newdesigns/newdesigns-01.png";
import newdesigns02 from "../../assets/images/newdesigns/newdesigns-02.png";

const newDesignsImages = [newdesigns01, newdesigns02];

function NewDesignsSection() {
  return (
    <section>
      <h2>New Designs</h2>
      <div>
        <button>&lt;</button>
        {newDesignsImages.map((img, idx) => (
          <img key={idx} src={img} alt={`newdesigns-${idx + 1}`} />
        ))}
        <button>&gt;</button>
      </div>
    </section>
  );
}

export default NewDesignsSection;