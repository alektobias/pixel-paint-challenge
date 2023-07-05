function Footer({ connectedUsers }: { connectedUsers: ConnectedUsers }) {
  return (
    <footer className="connected_users h-[5vh] border flex flex-col justify-center gap-1 px-6 bg-slate-200">
      {Object.values(connectedUsers).length > 0 && (
        <>
          <span className="text-xs text-slate-500">Connected Users:</span>
          <div className="flex items-center gap-3">
            {Object.values(connectedUsers).map((user) => (
              <div className="flex items-center gap-1" key={user.id}>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: user.color }}
                />
                <p className="leading-none text-slate-600">{user.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </footer>
  );
}

export default Footer;
