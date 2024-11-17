import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";

const LazyWrapper = ({ component: ComponentImport, props = {}, fallback = <div>Loading...</div> }) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjust as necessary
    triggerOnce: true, // Render only once when in view
  });

  const DynamicComponent = dynamic(() => ComponentImport().then(mod => mod.default), {
    ssr: false, // Disable SSR for heavy components
  });

  return (
    <div ref={ref}>
      {inView ? <DynamicComponent {...props} /> : fallback}
    </div>
  );
};

export default LazyWrapper;
