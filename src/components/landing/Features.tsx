import { BarChart3, QrCode, Zap } from 'lucide-react';

const Features = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-4">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="p-6 rounded-2xl bg-blue-50 hover:bg-primary-300 flex flex-col place-items-center transition-colors"
        >
          <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
export default Features;

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Create short URLs in seconds. Our optimized infrastructure ensures quick redirects.',
  },
  {
    icon: QrCode,
    title: 'QR Code Generator',
    description:
      'Generate QR codes for your shortened URLs instantly. Perfect for print materials.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description:
      'Track clicks, geographic location, and devices. Make data-driven decisions.',
  },
];
