import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Uses',
    description: 'A list of hardware and software I use to build and ship things',
  });
};

export const Uses = () => {
  return (
    <>
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="A rundown of the tools, languages, and gear I rely on every day to build backend systems, automate infrastructure, and ship products."
        />
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://code.visualstudio.com/">VS Code</Link> is my
                    primary editor. I keep it lean with the One Dark Pro theme and a few
                    essential extensions for Python, Docker, and Git.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.python.org/">Python</Link> is my go-to
                    language for backend services, automation scripts, data pipelines, and
                    anything that needs to get done fast and reliably.
                  </ListItem>
                  <ListItem>
                    For systems-level and performance-critical work I use{' '}
                    <Link href="https://isocpp.org/">C/C++</Link>. It's verbose but nothing
                    beats it when you need full control over memory and execution.
                  </ListItem>
                  <ListItem>
                    <Link href="https://reactjs.org/">React</Link> is my frontend
                    library of choice. The component model makes building complex UIs
                    feel structured and maintainable.
                  </ListItem>
                  <ListItem>
                    I use <Link href="https://www.docker.com/">Docker</Link> for
                    containerising everything. It removes the "works on my machine"
                    problem and makes deployments predictable.
                  </ListItem>
                  <ListItem>
                    For CI/CD and infrastructure automation I lean on{' '}
                    <Link href="https://github.com/features/actions">GitHub Actions</Link>{' '}
                    and write infrastructure as code wherever possible.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Tools &amp; Services</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://aws.amazon.com/">AWS</Link> for cloud
                    infrastructure — EC2, S3, Lambda, and SES are my most-used services.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.postgresql.org/">PostgreSQL</Link> is my
                    preferred relational database. Reliable, powerful, and battle-tested.
                  </ListItem>
                  <ListItem>
                    <Link href="https://redis.io/">Redis</Link> for caching,
                    session management, and pub/sub messaging when low latency matters.
                  </ListItem>
                  <ListItem>
                    <Link href="https://git-scm.com/">Git</Link> and{' '}
                    <Link href="https://github.com/">GitHub</Link> for version control
                    and collaboration — I follow a trunk-based development workflow.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.postman.com/">Postman</Link> for testing and
                    documenting REST APIs during development.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>System</ProjectSectionHeading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeadCell>OS</TableHeadCell>
                    <TableCell>Windows 11 / Ubuntu (WSL2)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Editor</TableHeadCell>
                    <TableCell>VS Code</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Terminal</TableHeadCell>
                    <TableCell>Windows Terminal + Zsh (WSL2)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Browser</TableHeadCell>
                    <TableCell>Chrome (dev) / Edge (daily)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Laptop</TableHeadCell>
                    <TableCell>Dell Laptop</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Keyboard</TableHeadCell>
                    <TableCell>Membrane (looking to upgrade)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Headphones</TableHeadCell>
                    <TableCell>boAt Rockerz 450</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
