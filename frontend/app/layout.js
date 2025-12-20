import './globals.css'

export const metadata = {
  title: "Pneumonia Detection | AI Medical Imaging",
  description: "Advanced AI-powered pneumonia detection from chest X-rays",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>Pneumonia Detection</h1>
            <p>Chest X-ray analysis for rapid pneumonia diagnosis</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}