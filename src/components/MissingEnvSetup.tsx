import { requiredEnvVars, type RequiredEnvVar } from "@/lib/env";

type MissingEnvSetupProps = {
  missingEnvVars: RequiredEnvVar[];
};

function MissingEnvSetup({ missingEnvVars }: MissingEnvSetupProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Project setup required</p>
          <h1 className="mt-3 text-3xl font-bold">Add your environment variables</h1>
          <p className="mt-3 text-muted-foreground">
            This interview platform uses Clerk for authentication, Convex for data, and Stream for
            video calls. The code is running, but these credentials are required before the app can
            load the authenticated experience.
          </p>

          <div className="mt-6 rounded-md border bg-muted/40 p-4">
            <p className="text-sm font-semibold">Missing now</p>
            <ul className="mt-3 space-y-2 text-sm">
              {missingEnvVars.map((name) => (
                <li key={name} className="font-mono text-muted-foreground">
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold">Create `.env.local` with:</p>
            <pre className="mt-3 overflow-x-auto rounded-md bg-black p-4 text-sm text-white">
              <code>
                {requiredEnvVars.map((name) => `${name}=\n`).join("")}
              </code>
            </pre>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            After filling the values, restart `npm run dev`. Run `npx convex dev` in a second
            terminal so Convex can sync the backend functions.
          </p>
        </div>
      </div>
    </main>
  );
}

export default MissingEnvSetup;
