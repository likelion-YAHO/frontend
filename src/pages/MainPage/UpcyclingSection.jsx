import upcycling01 from "../../assets/images/upcycling/upcycling-01.png";
import upcycling02 from "../../assets/images/upcycling/upcycling-02.png";
import upcycling03 from "../../assets/images/upcycling/upcycling-03.png";

const upcyclingImages = [upcycling01, upcycling02, upcycling03];

function UpcyclingSection() {
  return (
    <section>
      <h2>Upcycling Creations</h2>
      <div>
        <button>&lt;</button>
        {upcyclingImages.map((img, idx) => (
          <img key={idx} src={img} alt={`upcycling-${idx + 1}`} />
        ))}
        <button>&gt;</button>
      </div>
    </section>
  );
}

export default UpcyclingSection;