import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import StyledLink from "../components/StyledLink";

export default function Home() {
  return (
    <div>


    <section className="hero section is-block is-relative is-medium" style={{backgroundColor: "#00246B"}}>
      <div className="container">
        <div className="columns is-vcentered is-desktop">
          <div className="column">
            <motion.figure className="image" layoutId="image">
              <Image
                src="/assets/recruitement.png"
                layout="responsive"
                width={640}
                height={321}
              />
            </motion.figure>
          </div>
          <div className="column is-8-desktop has-text-centered-touch">
            <header>
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="title has-text-weight-bold is-1 is-size-2-mobile is-spaced"
                layoutId="title"
                style={{color: "white"}}
              >
                NyuRay - Applicant Tracking System
              </motion.h1>
              <motion.p
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{color: "white"}}
              >
                We strive to make the entire recruitement process easy, fast and hassel free
              </motion.p>
            </header>
            <motion.div
              className="buttons is-inline-flex mt-5"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
            <br/> 
       
            <br/> 
              <Link href="/features" passHref>
                <StyledLink>Explore</StyledLink>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}