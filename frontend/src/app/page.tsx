import PDFViewer from '@/components/features/PDFViewer';

export default function Home() {
  return (
    <div>
      <PDFViewer fileUrl="sample.pdf" />
    </div>
  );
}
