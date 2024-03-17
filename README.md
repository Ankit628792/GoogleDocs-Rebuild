## Google Docs
- google authentication, manage your own google docs, powered with enhanced editor
 
### Preview : https://google-docs-rebuild.vercel.app


<img src="/ss.png" />

<br />

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Ankit628792/GoogleDocs-Rebuild.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ``` 
3. Setup authentication and firestore in firebase with your google account. Get Google_ID and Google_SECRET_KEY from firebase

3. Enter your Google_ID and Google_SECRET_KEY `.env` in root folder
   ```
    GOOGLE_CLIENT_ID = 'ENTER YOUR GOOGLE_ID';
    GOOGLE_CLIENT_ID = 'ENTER YOUR GOOGLE_DECRET_KEY';
    NEXTAUTH_URL = 'http://localhost:3000'
   ```
