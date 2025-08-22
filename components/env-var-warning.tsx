export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <div>Supabase environment variables required</div>
      <div className="flex gap-2">
        <button disabled>Sign in</button>
        <button disabled>Sign up</button>
      </div>
    </div>
  );
}
