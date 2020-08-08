import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Link } from '../components/link'
import Logo from '../../static/logo.svg'

import classes from '../styles/index.module.sass'

export default ({ data }) => {
    const siteMetadata = data.site.siteMetadata
    const chapters = data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields.slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
    }))
    return (
        <Layout isHome>
            <Logo className={classes.logo} aria-label={siteMetadata.title} />

            <section>
                <h1 className={classes.subtitle}>A free, interactive course by Joseph Kato</h1>
                <div className={classes.introduction}>
                <p>
                    Hi there! Welcome to <i>Advanced Prose Linting With Vale And Vale Server</i>.
                    In this course, you'll learn absolutely everything there is to know about Vale
                    and Vale Server&mdash;from the basics of installation and usage to the most
                    advanced aspects of style creation and configuration.
                </p>
                <p>
                    Upon completion of the course, you'll have implemeted a complete, real-world
                    linting pipeline that enforces correct spelling, style, and grammar
                    according to your own in-house style guide and markup language (Markdown,
                    AsciiDoc, reStructuredText, or DITA). It'll combine a remote CI service with
                    local text editor usage (VS Code, Atom, or Sublime Text) to ensure that your
                    content is consistent, on-brand, and mistake-free across all of your platforms
                    and writers.
                </p>
                <p>
                    Let's get started!
                </p>
                <p>
                    <b>Prerequisites</b>: basic familiarity with the command line (Terminal, Command
                    Prompt, etc.).
                </p>
                </div>
            </section>

            {chapters.map(({ slug, title, description }) => (
                <section key={slug} className={classes.chapter}>
                    <h2 className={classes.chapterTitle}>
                        <Link hidden to={slug}>
                            {title}
                        </Link>
                    </h2>
                    <p className={classes.chapterDesc}>
                        <Link hidden to={slug}>
                            {description}
                        </Link>
                    </p>
                </section>
            ))}
        </Layout>
    )
}

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "chapter" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    }
`
