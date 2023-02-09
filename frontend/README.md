Inside src folder

- assets — เก็บรูปภาพและ font (กรณีที่เราดาวน์โหลด font มาใช้แบบไม่ใช้ CDN)
- components — เก็บ component ที่ไม่มีการใช้ state โดย folder ข้างใน 1 folder จะเก็บ 1 component โดยตั้งชื่อ component ขึ้นต้นด้วย capital letter เพื่อบอกว่าเป็น component และ 1 folder จะประกอบด้วย 2 files คือ .js (เขียน code JSX) และ .css (เขียน CSS)
- containers — เก็บ component ที่ใช้ state โดยหลักการตั้งชื่อและสร้าง component จะเหมือนกับ folder components

<img src="https://miro.medium.com/max/640/1*RoeKBnsDih6SB_OQBEDj6w.webp" alt="Project Structure" style="height: 600px;"/>

Scripts

- Linting (Error Checking): ***npm run lint***
- Format Code: ***npm run format***
