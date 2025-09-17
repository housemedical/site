export const metadata = { title: 'Contact & Newsletter' };
export default function ContactPage(){
  return(<section className="section"><div className="container">
    <h1>Contact</h1>
    <p>Email: <a href="mailto:info@example-osdc.gov.uk">info@example-osdc.gov.uk</a></p>
    <h2>Newsletter</h2>
    <form className="card" style={{padding:16}} onSubmit={(e)=>{e.preventDefault(); alert('Thanks — please check your email to confirm (double opt-in placeholder).');}}>
      <label htmlFor="email" className="kicker">Subscribe</label>
      <input id="email" type="email" required placeholder="you@example.com" style={{padding:12,borderRadius:12,border:'1px solid rgba(17,19,22,0.12)',width:'100%',marginTop:8}}/>
      <p style={{fontSize:14}}>We’ll send a confirmation link to complete your subscription.</p>
      <button className="button" style={{marginTop:8}}>Subscribe</button>
    </form>
  </div></section>);
}
