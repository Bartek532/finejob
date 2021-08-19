--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-08-19 15:43:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 635 (class 1247 OID 106935)
-- Name: experience; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.experience AS ENUM (
    'junior',
    'mid',
    'senior'
);


ALTER TYPE public.experience OWNER TO postgres;

--
-- TOC entry 204 (class 1255 OID 90284)
-- Name: f(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.f() RETURNS text
    LANGUAGE sql
    AS $$
  SELECT string_agg (substr('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', ceil (random() * 62)::integer, 1), '')
  FROM generate_series(1, 20)
$$;


ALTER FUNCTION public.f() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 106941)
-- Name: Offer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Offer" (
    id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    company_name character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    experience_level public.experience NOT NULL,
    salary integer NOT NULL,
    body text NOT NULL,
    company_url character varying(255),
    skills character varying(255),
    published_at timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Offer" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 90191)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    company character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 90202)
-- Name: UserOfferLibrary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserOfferLibrary" (
    "offerId" character varying(255) NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."UserOfferLibrary" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 90189)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 200
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 2864 (class 2604 OID 90194)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3010 (class 0 OID 106941)
-- Dependencies: 203
-- Data for Name: Offer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Offer" (id, title, company_name, city, experience_level, salary, body, company_url, skills, published_at, "userId") FROM stdin;
\.


--
-- TOC entry 3008 (class 0 OID 90191)
-- Dependencies: 201
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, company, password) FROM stdin;
\.


--
-- TOC entry 3009 (class 0 OID 90202)
-- Dependencies: 202
-- Data for Name: UserOfferLibrary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserOfferLibrary" ("offerId", "userId") FROM stdin;
\.


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 200
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- TOC entry 2873 (class 2606 OID 106953)
-- Name: Offer Offer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY (id);


--
-- TOC entry 2871 (class 2606 OID 90206)
-- Name: UserOfferLibrary UserOfferLibrary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserOfferLibrary"
    ADD CONSTRAINT "UserOfferLibrary_pkey" PRIMARY KEY ("offerId", "userId");


--
-- TOC entry 2867 (class 2606 OID 90201)
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- TOC entry 2869 (class 2606 OID 90199)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2875 (class 2606 OID 106951)
-- Name: Offer id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT id UNIQUE (id);


--
-- TOC entry 2876 (class 2606 OID 90207)
-- Name: UserOfferLibrary UserOfferLibrary_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserOfferLibrary"
    ADD CONSTRAINT "UserOfferLibrary_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id);


-- Completed on 2021-08-19 15:43:33

--
-- PostgreSQL database dump complete
--

